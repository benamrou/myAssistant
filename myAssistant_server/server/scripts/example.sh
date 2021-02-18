
. ~/env/envAssistant

sqlplus -s $APP_USERID @./sql/example_list.sql

chmod 777 ./sql/example_list.txt
sed '/^$/d' ./sql/example_list.txt > ./sql/example_list.out
  
mylist="./sql/CGO_store_list.out"

while read line;
do
if [ "$line" != "" ]; then 
  nohup curl -v -H ": " -H "cache-control: no-cache" -H "Connection: keep-alive" -H "Content-Type: application/x-www-form-urlencoded" -H "DATABASE_SID: HEINENS_CUSTOM_PROD" -H "LANGUAGE: HN" -H "USER: alert" -H "SUBJECT_EXT: for STORE #$line" "http://localhost:8092/api/notification/?PARAM=CGO0000000001_$line&PARAM=$line" -L &
fi;
done <"$mylist"

rm -f $mylist ./sql/CGO_store_list.txt

