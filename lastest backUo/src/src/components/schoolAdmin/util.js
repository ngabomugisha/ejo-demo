import moment from "moment";

export const HOUR_MINUTE_MASK = "HH:mm:";

export const isSameTime = (startTime, endTime) => moment(startTime, HOUR_MINUTE_MASK).isSame(endTime);

export const isBeforeTime = (startTime, endTime) => moment(startTime, HOUR_MINUTE_MASK).isBefore(endTime);

export const isAfterTime = (startTime, endTime) => moment(startTime, HOUR_MINUTE_MASK).isAfter(endTime);

export const isSameOrBeforeTime = (startTime, endTime) => moment(startTime, HOUR_MINUTE_MASK).isSameOrBefore(endTime);

export const isSameOrAfterTime = (startTime, endTime) => moment(startTime, HOUR_MINUTE_MASK).isSameOrAfter(endTime);
