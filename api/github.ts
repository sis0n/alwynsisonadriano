import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const username = "sis0n";
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    try {
      const publicRes = await fetch(`https://api.github.com/users/${username}`);
      if (publicRes.ok) {
        const u = await publicRes.json();
        return response.status(200).json({
          name: u.name || "Alwyn Sison Adriano",
          login: u.login || username,
          avatarUrl: u.avatar_url || `https://github.com/${username}.png`,
          bio: u.bio || "Computer Science Student | Backend Developer",
          createdAt: u.created_at || "2020-01-01T00:00:00Z",
          publicRepositories: u.public_repos || 12,
          followers: u.followers || 5,
          repositories: [],
          currentYearCommits: 120,
          lifetimeCommits: 450,
        });
      }
    } catch {
      // fallback
    }
    return response.status(200).json({
      name: "Alwyn Sison Adriano",
      login: username,
      avatarUrl: `https://github.com/${username}.png`,
      bio: "Computer Science Student | Backend Developer",
      createdAt: "2020-01-01T00:00:00Z",
      publicRepositories: 12,
      followers: 5,
      currentYearCommits: 120,
      lifetimeCommits: 450,
      repositories: []
    });
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
    const startYear = new Date(user.createdAt).getFullYear();
    const currentYear = new Date().getFullYear();
    
    // In a single query we only get the current contributionsCollection
    // To get "lifetime" we'd need to loop or use a different endpoint
    // For now, let's at least differentiate the current year from the total
    // and provide a better name or fetch more years if needed.
    
    let totalCommits = 0;
    
    // Fetching previous years
    const yearQueries = [];
    for (let year = startYear; year <= currentYear; year++) {
      const start = `${year}-01-01T00:00:00Z`;
      const end = `${year}-12-31T23:59:59Z`;
      yearQueries.push(`
        y${year}: contributionsCollection(from: "${start}", to: "${end}") {
          contributionCalendar {
            totalContributions
          }
        }
      `);
    }

    const lifetimeQuery = `
      query($login: String!) {
        user(login: $login) {
          ${yearQueries.join('\n')}
        }
      }
    `;

    const lifetimeRes = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: lifetimeQuery,
        variables: { login: username },
      }),
    });

    const lifetimeJson = await lifetimeRes.json();
    if (!lifetimeJson.errors) {
      const yearsData = lifetimeJson.data.user;
      Object.values(yearsData).forEach((year: any) => {
        totalCommits += year.contributionCalendar.totalContributions;
      });
    } else {
      totalCommits = user.contributionsCollection.contributionCalendar.totalContributions;
    }
    
    const data = {
      name: user.name,
      login: user.login,
      avatarUrl: user.avatarUrl,
      bio: user.bio,
      createdAt: user.createdAt,
      publicRepositories: user.repositories.totalCount,
      followers: user.followers.totalCount,
      repositories: user.repositories.nodes,
      currentYearCommits: user.contributionsCollection.contributionCalendar.totalContributions,
      lifetimeCommits: totalCommits,
      contributionsCollection: user.contributionsCollection
    };

    return response.status(200).json(data);
  } catch (error) {
    return response.status(500).json({ error: "Failed to fetch GitHub data" });
  }
}
