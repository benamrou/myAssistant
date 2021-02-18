. ~/envAssistant
date_today=`date +"%Y%m%d"`


# DUMP THE DATABASE
exp db_design/db_design owner=myassistant file=${APPS_BACKUP}/myassistant_$date_today.dmp > ${APPS_LOGS}/myAssistant_$date_today.log

# REMOVE OLD DUMP - Default 5 days
find ${APPS_BACKUP}/  -mtime +3 -exec rm {} \;
find ${APP_LOGS} -mtime +5 -exec rm {} \;

