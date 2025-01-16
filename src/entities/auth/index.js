async function loginAPI() {
  const url = new URL("https://api.kkomo.site/v1/auth/login?redirect=http://localhost:3000");
  const res = await fetch(url, {
    method: "GET",
    redirect: "follow",
  });
}

export { loginAPI };
