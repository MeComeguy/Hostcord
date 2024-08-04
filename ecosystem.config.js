module.exports = {
  apps: [
    {
      name: 'backend',
      script: 'backend/index.js',
      cwd: './backend',
      watch: false,
    },
    {
      name: 'frontend',
      script: 'npm',
      args: 'start',
      cwd: './frontend',
      watch: false,
    },
  ],
};

