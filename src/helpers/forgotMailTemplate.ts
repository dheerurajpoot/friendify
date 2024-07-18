export const forgotMailTemplate = (token: any) => {
	return `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Reset Password</title>
</head>

<body>
  <h3>
    Welcome to ${process.env.COMPANY_NAME}
  </h3>
  <p>
    Click <a href="${process.env.DOMAIN}/resetpassword?token=${token}">Reset Password</a> to Reset your password or copy and paste the link to into the browser <br/> ${process.env.DOMAIN}/resetpassword?token=${token} </p> 
</body>

</html>`;
};
