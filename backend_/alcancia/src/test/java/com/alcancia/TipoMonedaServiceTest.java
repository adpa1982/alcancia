package com.alcancia;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import com.alcancia.entity.TipoMoneda;
import com.alcancia.repository.ITipoMonedaRepository;
import com.alcancia.service.TipoMonedaService;

@SpringBootTest
class TipoMonedaServiceTest {
	
	@Mock
	private ITipoMonedaRepository repository;
	
	@InjectMocks
	private TipoMonedaService service;
	
	
	private TipoMoneda tipoMoneda;
	
	
	@BeforeEach
	void setUp() {
		MockitoAnnotations.initMocks(this);
		tipoMoneda = new TipoMoneda();
		tipoMoneda.setId((long) 7);
		tipoMoneda.setNombre(500);
	}
	

	@Test
	void findAllTest() {
		when(repository.findAll()).thenReturn(Arrays.asList(tipoMoneda));
		assertNotNull(service.findAll());
	}
	
	@Test
	void findByIdTest() {
		Long id = (long) 7;
		when(repository.findById(id)).thenReturn(Optional.of(tipoMoneda));
		assertNotNull(service.findById(id));
	}
	
	@Test
	void existsByNombreTest() {
		Integer nombre = 500;
		when(repository.existsByNombre(nombre)).thenReturn(true);
		assertTrue(service.existsByNombre(nombre));
	}
	
	@Test
	void findByNombreTest() {
		Integer nombre = 500;
		when(repository.findByNombre(nombre)).thenReturn(Optional.of(tipoMoneda));
		assertNotNull(service.findByNombre(nombre));
	}
	
	@Test
	void saveTest() {
		when(repository.save(tipoMoneda)).thenReturn(tipoMoneda);
		assertNotNull(service.save(tipoMoneda));
	}
	
	@Test
	void findAllByOrderByNombreAscTest() {
		TipoMoneda tipoMoneda = new TipoMoneda();
		tipoMoneda.setId((long) 7);
		tipoMoneda.setNombre(500);
		TipoMoneda tipoMoneda2 = new TipoMoneda();
		tipoMoneda2.setId((long) 7);
		tipoMoneda2.setNombre(200);
		List<TipoMoneda> l = new ArrayList<TipoMoneda>();
		l.add(tipoMoneda);
		l.add(tipoMoneda2);
		
		Iterable<TipoMoneda> list = l;
			
		when(repository.findAllByOrderByNombreAsc()).thenReturn(l);
		assertNotNull(service.findAllByOrderByNombreAsc());
	}
	

}
