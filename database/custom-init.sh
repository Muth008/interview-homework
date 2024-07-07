#!/bin/bash
# custom-init.sh

SQL_SCRIPT="/sql-scripts/init.sql"

# Use sed to replace a placeholder in your SQL script with the actual password
# Ensure your SQL script has a placeholder for the password like '{{PASSWORD}}'
sed -i "s/{{PASSWORD}}/${MYSQL_USER_PASS}/g" $SQL_SCRIPT

# Execute the modified SQL script
mysql -u root --password="${MYSQL_ROOT_PASSWORD}" < $SQL_SCRIPT