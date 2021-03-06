package com.alcancia;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.dao.DataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;

import com.alcancia.controller.AlcanciaController;
import com.alcancia.dto.AlcanciaDto;
import com.alcancia.dto.TipoMonedaDto;
import com.alcancia.entity.Alcancia;
import com.alcancia.entity.TipoMoneda;
import com.alcancia.service.AlcanciaService;

class AlcanciaControllerTest {

	@InjectMocks
	private AlcanciaController controller;
	
	@Mock
	private AlcanciaService service;
		
	private Alcancia alcancia;
	
	private TipoMoneda tipoMoneda;
	
	private AlcanciaDto alcanciaDto;
	
	private TipoMonedaDto tipoMonedaDto;
	
	@BeforeEach
	void setUp() {
		MockitoAnnotations.initMocks(this);
		
		tipoMoneda = new TipoMoneda();
		tipoMoneda.setId((long) 1);
		tipoMoneda.setNombre(50);
		
		alcanciaDto = new AlcanciaDto();
		alcanciaDto.setId((long) 1);
		alcanciaDto.setTipoMoneda(tipoMoneda);
		
		alcancia = new Alcancia();
		alcancia.setId(alcanciaDto.getId());
		alcancia.setTipoMoneda(alcanciaDto.getTipoMoneda());
	}
	
	@Test
	void listTest() {
		ResponseEntity<?> res = controller.list();
		assertEquals(200, res.getStatusCodeValue());
	}
	
	@Test
	void listFailedTest() {
		when(service.findAll()).thenThrow(new DataAccessException("") {});
		ResponseEntity<?> res = controller.list();
		assertEquals(500, res.getStatusCodeValue());
	}
	
	@Test
	void saveTest() {
		when(service.save(alcancia)).thenReturn(alcancia);
		BindingResult result = Mockito.mock(BindingResult.class);
		ResponseEntity<?> res = controller.save(alcanciaDto, result);
		assertEquals(201, res.getStatusCodeValue());
	}
	
	@Test
	void saveErrosTest() {
		when(service.save(alcancia)).thenThrow(new RuntimeException("Exception Occours"));
		BindingResult result = Mockito.mock(BindingResult.class);
		Mockito.when(result.hasErrors()).thenReturn(true);
		ResponseEntity<?> res = controller.save(alcanciaDto, result);
		// System.out.print(res);
		assertEquals(400, res.getStatusCodeValue());
	}
	
	@Test
	void saveDataTest() {
		when(service.save(alcancia)).thenThrow(new DataAccessException("") {});
		BindingResult result = Mockito.mock(BindingResult.class);
		Mockito.when(result.hasErrors()).thenReturn(true);
		ResponseEntity<?> res = controller.save(alcanciaDto, result);
		// System.out.print(res);
		assertEquals(400, res.getStatusCodeValue());
	}
	
	@Test
	void listCantidadTest() {
		Long id = (long) 1;
		ResponseEntity<?> res = controller.listCantidad(id);
		assertEquals(200, res.getStatusCodeValue());
	}
	
	@Test
	void listCantidadFailedTest() {
		Long id = (long) 11;
		when(service.findAlcanciaByTipoMonedaByIdByGroupByNombre(id)).thenThrow(new DataAccessException("") {});
		ResponseEntity<?> res = controller.listCantidad(id);
		assertEquals(500, res.getStatusCodeValue());
	}
	
	@Test
	void listValorTest() {
		Long id = (long) 1;
		ResponseEntity<?> res = controller.listValor(id);
		assertEquals(200, res.getStatusCodeValue());
	}
	
	@Test
	void listValorFailedTest() {
		Long id = (long) 11;
		when(service.findAlcanciaByTipoMonedaValorByIdByGroupByNombre(id)).thenThrow(new DataAccessException("") {});
		ResponseEntity<?> res = controller.listValor(id);
		assertEquals(500, res.getStatusCodeValue());
	}
	
	@Test
	void listCantidadTotalTest() {
		ResponseEntity<?> res = controller.listCantidadTotal();
		assertEquals(200, res.getStatusCodeValue());
	}
	
	@Test
	void listValorTotalTest() {
		ResponseEntity<?> res = controller.listValorTotal();
		assertEquals(200, res.getStatusCodeValue());
	}

}
