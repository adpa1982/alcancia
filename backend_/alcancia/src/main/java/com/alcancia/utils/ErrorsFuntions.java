package com.alcancia.utils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;

import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ErrorsFuntions {
	
	private ErrorsFuntions() {
	    throw new IllegalStateException("ErrorsFuntions class");
	}
	
	public static String primerletra(String letra) {
		char[] caracteres = letra.toCharArray();
		caracteres[0] = Character.toUpperCase(caracteres[0]);
		return new String(caracteres);
	}
	
	public static String campoTabla(String campo) {
		StringBuilder bld = new StringBuilder();
		if (campo.contains("_")) {
			String[] parts = campo.split("_");
			if (parts.length >= 2) {
				bld.append(partOne(parts));
			} else {
				bld.append(ErrorsFuntions.primerletra(parts[1]));
			}
		} else {
			bld.append(campo);
		}
		return bld.toString();
	}
	
	public static String partOne(String[] parts) {
		StringBuilder bld = new StringBuilder();
		String parteUno = parts[0];
		if (parteUno.length() == 3 ) {
			for (int i = 1; i < parts.length; i++) { 
				 if (i > 1) {
			  		 bld.append(ErrorsFuntions.primerletra(parts[i]));
				 } else {
			 		 bld.append(parts[i]);
				 }
			}	
		} else {
			bld.append(parts[0]);
			bld.append(ErrorsFuntions.primerletra(parts[1]));
		}
		return bld.toString();
	}
	
	public static String splitMsgController(String message, String split, List<Integer> parameters) {
		String keyNew = "";
		String[] partsMsg = null;
		partsMsg = message.split(split);
		keyNew = partsMsg[parameters.get(0)];
		keyNew = keyNew.substring(parameters.get(1), keyNew.length() - parameters.get(2));
		return keyNew;
	}
	
	public static ResponseEntity<?> errorMessageSave(String messageError) {
		Map<String, Object> error = new HashMap<>();
		String key = "";
		String value = "";
		String table = "";
		List<Integer> parameters = null;
		if (messageError.contains("unique")) {
			parameters = List.of(1, 0, 2);
			key = ErrorsFuntions.splitMsgController(messageError, "\\(", parameters);
			key = ErrorsFuntions.campoTabla(key);
			parameters = List.of(1, 0, 2);
			value = ErrorsFuntions.splitMsgController(messageError, "=\\(", parameters);
			parameters = List.of(1, 1, 0);
			table = ErrorsFuntions.splitMsgController(messageError, "«", parameters);
			parameters = List.of(0, 0, 0);
			table = ErrorsFuntions.splitMsgController(table, "_", parameters);
		}
		error.put("key", key);
		error.put("value", value);
		error.put("table", ErrorsFuntions.primerletra(table));
		return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(error);
	}
	
	public static ResponseEntity<?> errorConstraint(ConstraintViolationException cve) {
		Map<String, Object> errores = new HashMap<>();
		for (ConstraintViolation<?> constraintViolation : cve.getConstraintViolations()) {
			 errores.put(constraintViolation.getPropertyPath().toString(), "El campo " + constraintViolation.getPropertyPath() + " " + constraintViolation.getMessage());
	    }
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errores);
	}
	
	public static ResponseEntity<?> errorMessage(DataAccessException e, String mensaje) {
		Map<String, Object> error = new HashMap<>();
		error.put("message", mensaje);
		error.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
	}

}
