const validLoginBody = {
  email: "admin@admin.com",
  password: "secret_admin"
};

const user = {
  id: 1,
  username: "Admin",
  role: "admin",
  email: "admin@admin",
  password: "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW"
};

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY5MzE4MjE1MywiZXhwIjoxNjkzNzg2OTUzfQ.rH4DDQYZu_SsOxbA0mrR1xYp_mlsajRAjPdxg5sMD-E'

const noEmailBody = {
  email: "",
  password: "secret_admin"
};

const noPasswordBody = {
  email: "admin@admin",
  password: ""
};

const noValidEmailBody =  {
  email: "@exemplo.com",
  password: "secret_admin",
}

const notFoundUser = {
  email: "admin@admin2.com",
  password: "secret_admin"
};

const noValidPasswordBody = {
  email: "admin@admin2.com",
  password: "secr"
};

const unregisteredPassword = {
  email: "admin@admin.com",
  password: "secret_ad"
};


export {
  validLoginBody,
  user,
  token,
  noEmailBody,
  noPasswordBody,
  noValidEmailBody,
  notFoundUser,
  noValidPasswordBody,
  unregisteredPassword,
}