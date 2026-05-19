/**
 * Basic Authentication Middleware
 * Validates requests using Basic Auth with credentials configured via environment variables.
 */
export function basicAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    res.setHeader('WWW-Authenticate', 'Basic realm="CafeFinder API"');
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid credentials' });
  }

  // Parse credentials
  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');

  const configUser = process.env.BASIC_AUTH_USER;
  const configPassword = process.env.BASIC_AUTH_PASSWORD;

  if (!configUser || !configPassword) {
    console.error('Basic authentication credentials not configured in environment variables.');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  if (username !== configUser || password !== configPassword) {
    res.setHeader('WWW-Authenticate', 'Basic realm="CafeFinder API"');
    return res.status(401).json({ error: 'Unauthorized: Invalid username or password' });
  }

  next();
}
