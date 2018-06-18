const helloThemeProps = {
  hello: 'my-hello-styles'
}

window['SimpleLib'].instantiateHello(
  document.getElementById('hello'),
  helloThemeProps
);


window['SimpleLib'].instantiateGithubMemberList(
  document.getElementById('githublist'),
  {}
);

