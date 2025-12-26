#!/bin/bash
# Ensure the custom Node path is used
export PATH=/usr/local/node16/bin:$PATH
cd /opt/node-apps/nodejs_app_emp_manager

# Optional: log output to file for debugging
exec /usr/local/node16/bin/node app.js >> /var/log/node_app.log 2>&1
