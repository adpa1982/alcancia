package com.alcancia;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import com.alcancia.utils.ErrorsFuntions;

class ErrorsFuntionsTest {
	
	
	
	@BeforeEach
	void setUp() {
		MockitoAnnotations.initMocks(this);
		
	}

	@Test
	void primerletraTest() {
		String word = "primeraletra";
		String pm = ErrorsFuntions.primerletra(word);
		assertEquals("Primeraletra", pm);
	}
	
	@Test
	void campoTablaTest() {
		String campoTabla = "alc_idtipomoneda";
		String cp = ErrorsFuntions.campoTabla(campoTabla);
		assertEquals("idtipomoneda", cp);
	}
	
	@Test
	void errorMessageSaveTest() {
		String message = "ERROR: llave duplicada viola restricción de unicidad «tdepartamentos_dep_nombre_unique» Detail: Ya existe la llave (pai_nombre)=(ARGENTINA).";
		ResponseEntity<?> cp = ErrorsFuntions.errorMessageSave(message);
		System.out.println(cp.getStatusCodeValue());
		assertEquals(501, cp.getStatusCodeValue());
	}
	
	
	

}
