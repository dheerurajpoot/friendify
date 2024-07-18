export const verifyMailTemplate = (token: any) => {
	return `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Verify Email</title>
</head>

<body>
  <h3>
    Welcome to ${process.env.COMPANY_NAME}
  </h3>
  <p>
    Click <a href="${process.env.DOMAIN}/verifyemail?token=${token}">Verify Email</a> to verify your email <br/> or <br/> copy and paste the link to into the browser <br/> ${process.env.DOMAIN}/verifyemail?token=${token} </p> 
</body>

</html>`;
};
