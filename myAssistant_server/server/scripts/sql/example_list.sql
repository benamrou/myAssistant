set termout off
set feed off
set head off
set echo off

spool ./sql/CGO_store_list.txt


   SELECT socsite "SiteCode"
   FROM SITDGENE
   WHERE SOCCMAG=10 and SOCSITE in (4,5,8,17,10,12,22);

spool off;

exit success
