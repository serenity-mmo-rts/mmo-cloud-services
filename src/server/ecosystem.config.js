module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps: [
        {
            name: 'server',
            script: './server.js',
            instances: 1,
            exec_mode: 'fork',
            watch: false,
            max_memory_restart: '2000M',
            merge_logs: true,
            log_file: "/home/node/.pm2/logs/server-combined.outerr.log",
            env: {
            }
        },
        {
            name      : 'serverAdmin',
            script    : './serverAdmin.js',
            instances : 1,
            exec_mode : 'fork',
            watch     : false,
            max_memory_restart: '200M',
            merge_logs: true,
            log_file: "/home/node/.pm2/logs/serverAdmin-combined.outerr.log",
            env: {
            }
        }

    ]
};
