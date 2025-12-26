import { users } from '../data/users.js';
import { isValidEmail } from '../utils/validators.js';

// REGISTER
export const register = (req, res) => {
  const { email, password } = req.body;

  if (!isValidEmail(email))
    return res.status(400).json({ error: 'Invalid email' });

  if (!password || password.length < 6)
    return res.status(400).json({ error: 'Password too short' });

  const exists = users.find(u => u.email === email);
  if (exists)
    return res.status(409).json({ error: 'Email already exists' });

  users.push({ email, password });
  res.status(201).json({ message: 'Registered successfully' });
};

// LOGIN
export const login = (req, res) => {
  const { email, password } = req.body;

  if (!isValidEmail(email))
    return res.status(400).json({ error: 'Invalid email' });

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  res.json({ message: 'Login successful' });
};
