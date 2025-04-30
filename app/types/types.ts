
export interface IGithubUser {
    login: string,
    id: number,
    avatar_url: string,
    html_url?: string,
}

export interface IRepo {
    id?: number,
    name: string,
    description: string,
    stargazers_count: number,
  }