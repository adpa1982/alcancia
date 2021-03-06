package com.alcancia;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import com.alcancia.entity.Alcancia;
import com.alcancia.entity.TipoMoneda;
import com.alcancia.repository.IAlcanciaRepository;
import com.alcancia.service.AlcanciaService;

@SpringBootTest
class AlcanciaServiceTest {
	
	@Mock
	private IAlcanciaRepository repository;
	
	@InjectMocks
	private AlcanciaService service;
	
	
	private Alcancia alcancia;
	
	private TipoMoneda tipoMoneda;
	
	@BeforeEach
	void setUp() {
		MockitoAnnotations.initMocks(this);
		tipoMoneda = new TipoMoneda();
		tipoMoneda.setId((long) 1);
		tipoMoneda.setNombre(50);
		
		alcancia = new Alcancia();
		alcancia.setId((long) 1);
		alcancia.setTipoMoneda(tipoMoneda);
		
	}

	@Test
	void findAllTest() {
		when(repository.findAll()).thenReturn(Arrays.asList(alcancia));
		assertNotNull(service.findAll());
	}
	
	@Test
	void saveTest() {
		when(repository.save(alcancia)).thenReturn(alcancia);
		assertNotNull(service.save(alcancia));
	}
	
	@Test
	void findAlcanciaByTipoMonedaByIdByGroupByNombreTest() {
		List<TipoMoneda> l = new ArrayList<TipoMoneda>();
		l.add(tipoMoneda);
		List<Alcancia> al = new ArrayList<Alcancia>();
		al.add(alcancia);
		Iterable<Alcancia> lista = al;
		Long id = (long) 1;
		
		when(repository.findAlcanciaByTipoMonedaByIdByGroupByNombre(id)).thenReturn(lista);
		assertNotNull(service.findAlcanciaByTipoMonedaByIdByGroupByNombre(id));
	}
	
	@Test
	void findAlcanciaByTipoMonedaValorByIdByGroupByNombreTest() {
		List<TipoMoneda> l = new ArrayList<TipoMoneda>();
		l.add(tipoMoneda);
		List<Alcancia> al = new ArrayList<Alcancia>();
		al.add(alcancia);
		Iterable<Alcancia> lista = al;
		Long id = (long) 1;
		when(repository.findAlcanciaByTipoMonedaValorByIdByGroupByNombre(id)).thenReturn(lista);
		assertNotNull(service.findAlcanciaByTipoMonedaValorByIdByGroupByNombre(id));
	}
	
	@Test
	void findAlcanciaByMonedasTest() {
		assertNotNull(service.findAlcanciaByMonedas());
	}
	
	@Test
	void findAlcanciaByValorTest() {
		assertNotNull(service.findAlcanciaByValor());
	}
	
	

}
