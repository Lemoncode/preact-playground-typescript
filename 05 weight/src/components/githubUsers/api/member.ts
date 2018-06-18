import * as request from 'superagent'

export const fetchGithubMemberList = (callback) => {
  request.get('https://api.github.com/orgs/lemoncode/members')
    .end(callback);
}