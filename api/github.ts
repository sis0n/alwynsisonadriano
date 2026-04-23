import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const username = "sis0n";
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return response.status(500).json({ error: "GITHUB_TOKEN not configured" });
  }

  const query = `
    query($login: String!) {
      user(login: $login) {
        name
        login
        avatarUrl
        bio
        createdAt
        followers {
          totalCount
        }
        repositories(first: 100, ownerAffiliations: OWNER, orderBy: {field: CREATED_AT, direction: DESC}) {
          totalCount
          nodes {
            name
            stargazerCount
            forkCount
            primaryLanguage {
              name
              color
            }
          }
        }
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
                color
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { login: username },
      }),
    });

    const json = await res.json();

    if (json.errors) {
      return response.status(400).json({ errors: json.errors });
    }

    const user = json.data.user;
    
    // Process and simplify the data for the frontend
    const data = {
      name: user.name,
      login: user.login,
      avatarUrl: user.avatarUrl,
      bio: user.bio,
      createdAt: user.createdAt,
      publicRepositories: user.repositories.totalCount,
      followers: user.followers.totalCount,
      repositories: user.repositories.nodes,
      lifetimeCommits: user.contributionsCollection.contributionCalendar.totalContributions,
      contributionsCollection: user.contributionsCollection
    };

    return response.status(200).json(data);
  } catch (error) {
    return response.status(500).json({ error: "Failed to fetch GitHub data" });
  }
}
