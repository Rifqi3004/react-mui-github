import axios, { AxiosResponse } from 'axios';
import { GithubRepositoryInterface, ResponseGithubUsernameInterface } from '../interfaces/home.interface';

const headers = {
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'Authorization': `Bearer ${process.env.REACT_APP_GITHUB_API}`
};

export const getUsername = (username: string): ResponseGithubUsernameInterface | any => {
    return axios.get(`https://api.github.com/search/users?q=${username}`, {
        headers
    }).then((resp: AxiosResponse) => {
        const data:ResponseGithubUsernameInterface = resp.data;
        return data;
    });
}

export const getRepository = (url: string): GithubRepositoryInterface[] | any => {
    return axios.get(url, {
        headers
    }).then((resp: AxiosResponse) => {
        const data:GithubRepositoryInterface = resp.data;
        return data;
    });

}