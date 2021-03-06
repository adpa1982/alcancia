package com.alcancia;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.dao.DataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;

import com.alcancia.controller.TipoMonedaController;
import com.alcancia.dto.TipoMonedaDto;
import com.alcancia.entity.TipoMoneda;
import com.alcancia.service.TipoMonedaService;

class TipoModenaControllerTest {
	
	@InjectMocks
	private TipoMonedaController controller;
	
	@Mock
	private TipoMonedaService service;
		
	private TipoMoneda tipoMoneda;
	
	private TipoMonedaDto tipoMonedaDto;
	
	@BeforeEach
	void setUp() {
		MockitoAnnotations.initMocks(this);
		
		tipoMoneda = new TipoMoneda();
		tipoMoneda.setId((long) 7);
		tipoMoneda.setNombre(5000);
		
		tipoMonedaDto = new TipoMonedaDto();
		tipoMonedaDto.setId((long) 7);
		tipoMonedaDto.setNombre(5000);
	}
	
	@Test
	void listTest() {
		ResponseEntity<?> res = controller.list();
		assertNotNull(service.findAll());
	}
	
	@Test
	void listFailedTest() {
		when(service.findAll()).thenThrow(new DataAccessException("") {});
		ResponseEntity<?> res = controller.list();
		assertEquals(500, res.getStatusCodeValue());
	}
	
	@Test
	void listOrderTest() {
		ResponseEntity<?> res = controller.listOrder();
		assertNotNull(service.findAll());
	}
	
	@Test
	void saveTest() {
		when(service.save(tipoMoneda)).thenReturn(tipoMoneda);
		BindingResult result = Mockito.mock(BindingResult.class);
		ResponseEntity<?> res = controller.save(tipoMonedaDto, result);
		assertEquals(201, res.getStatusCodeValue());
	}
	
	@Test
	void saveDataTest() {
		when(service.save(tipoMoneda)).thenThrow(new DataAccessException("") {});
		BindingResult result = Mockito.mock(BindingResult.class);
		Mockito.when(result.hasErrors()).thenReturn(true);
		ResponseEntity<?> res = controller.save(tipoMonedaDto, result);
		// System.out.print(res);
		assertEquals(400, res.getStatusCodeValue());
	}
	
	@Test
	void saveErrosTest() {
		TipoMonedaDto tipoMonedaDto1 = new TipoMonedaDto();
		tipoMonedaDto1.setId((long) 1);
		tipoMonedaDto1.setNombre(50000);
		
		TipoMoneda tipoMoneda1 = new TipoMoneda();
		tipoMoneda1.setId(tipoMonedaDto1.getId());
		tipoMoneda1.setNombre(tipoMonedaDto1.getNombre());
		
		when(service.save(tipoMoneda1)).thenThrow(new RuntimeException("Exception Occours"));
		BindingResult result = Mockito.mock(BindingResult.class);
		Mockito.when(result.hasErrors()).thenReturn(true);
		ResponseEntity<?> res = controller.save(tipoMonedaDto1, result);
		System.out.print(res);
		assertEquals(400, res.getStatusCodeValue());
	}
	
	@Test
	void saveUsedTest() {
		TipoMonedaDto tipoMonedaDto1 = new TipoMonedaDto();
		tipoMonedaDto1.setId((long) 1);
		tipoMonedaDto1.setNombre(50000);
		
		TipoMoneda tipoMoneda1 = new TipoMoneda();
		tipoMoneda1.setId(tipoMonedaDto1.getId());
		tipoMoneda1.setNombre(tipoMonedaDto1.getNombre());
		
		when(service.existsByNombre(tipoMoneda1.getNombre())).thenReturn(true);
		BindingResult result = Mockito.mock(BindingResult.class);
		Mockito.when(result.hasErrors()).thenReturn(false);
		ResponseEntity<?> res = controller.save(tipoMonedaDto1, result);
		assertEquals(226, res.getStatusCodeValue());
	}

}
