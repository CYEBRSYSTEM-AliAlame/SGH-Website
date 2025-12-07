# Security Policy

## Supported Versions

We actively support and provide security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Security Standards

This project follows **OWASP Application Security Verification Standard (ASVS) Level 3** guidelines to ensure comprehensive security coverage.

## Security Features

### Input Validation
- All API endpoints validate input using Zod schemas
- SQL injection prevention through parameterized queries
- Input sanitization for SQL LIKE patterns
- Type coercion and validation for all user inputs

### Database Security
- Parameterized queries prevent SQL injection
- SSL/TLS encryption for database connections
- Certificate validation in production environments
- Query timeout enforcement (5 seconds)
- Connection pool security limits

### API Security
- Rate limiting (100 requests/minute per IP)
- Request size limits
- Request timeout protection
- Input validation on all endpoints
- Error message sanitization

### Security Headers
- Content-Security-Policy (CSP)
- Strict-Transport-Security (HSTS)
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy

### Error Handling
- Centralized error handling
- No sensitive information in error messages
- Detailed errors logged server-side only
- Generic error messages returned to clients

### Logging
- Structured logging (JSON format)
- Sensitive data sanitization
- Request ID tracking
- Security event logging

### Environment Variables
- Runtime validation of environment variables
- Type-safe environment variable access
- Fail-fast on missing required variables

## Reporting a Vulnerability

If you discover a security vulnerability, please **do not** open a public issue. Instead, please follow these steps:

1. **Email Security Team**: Send an email to the security team with:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

2. **Response Time**: We aim to respond within 48 hours and provide an initial assessment.

3. **Disclosure Policy**: 
   - We will acknowledge receipt of your report
   - We will work with you to understand and resolve the issue
   - We will notify you when the vulnerability is fixed
   - We will credit you in the security advisory (if desired)

## Security Best Practices

### For Developers

1. **Never commit secrets**: Use environment variables for all sensitive data
2. **Validate all inputs**: Use the provided validation utilities
3. **Use parameterized queries**: Never concatenate user input into SQL queries
4. **Sanitize error messages**: Never expose sensitive information in errors
5. **Keep dependencies updated**: Run `npm audit` regularly
6. **Follow secure coding practices**: Review OWASP Top 10 regularly

### For Deployment

1. **Use HTTPS**: Always use HTTPS in production
2. **Environment Variables**: Set all required environment variables
3. **Database SSL**: Enable SSL for database connections in production
4. **Regular Updates**: Keep dependencies and runtime updated
5. **Monitoring**: Monitor logs for security events
6. **Backup**: Regular backups of database and configuration

## Dependency Security

We regularly audit dependencies for security vulnerabilities:

```bash
# Check for vulnerabilities
npm audit

# Fix automatically fixable issues
npm audit fix

# Run full security check (audit + type check + lint)
npm run security:check
```

## Security Updates

- **Regular Audits**: We run security audits before each deployment
- **Dependency Updates**: Dependencies are updated regularly
- **Security Patches**: Critical security patches are applied immediately
- **Version Pinning**: Production dependencies are pinned to specific versions

## Compliance

This application implements security controls aligned with:

- OWASP ASVS Level 3
- OWASP Top 10
- Security best practices for Next.js applications

## Security Checklist

Before deploying to production, ensure:

- [ ] All environment variables are set correctly
- [ ] Database SSL is enabled and certificates are validated
- [ ] Security headers are configured
- [ ] Rate limiting is enabled
- [ ] Error handling is properly configured
- [ ] Logging is configured and sanitized
- [ ] Dependencies are up to date (`npm audit`)
- [ ] Type checking passes (`npm run type-check`)
- [ ] Linting passes (`npm run lint`)

## Contact

For security-related questions or to report vulnerabilities, please contact the security team.

