import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import calendar from "dayjs/plugin/calendar";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";

dayjs.locale("pt-br");
dayjs.extend(calendar);
dayjs.extend(customParseFormat);
dayjs.extend(utc);
