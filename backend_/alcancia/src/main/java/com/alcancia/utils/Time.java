package com.alcancia.utils;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Time {

	public Timestamp getPsTime() {
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date dateTime = new Date();
        return Timestamp.valueOf(dateFormat.format(dateTime));
	}
	
	
}
