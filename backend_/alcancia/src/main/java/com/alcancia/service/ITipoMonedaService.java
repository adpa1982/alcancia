package com.alcancia.service;

import java.util.List;
import java.util.Optional;

import com.alcancia.entity.TipoMoneda;

public interface ITipoMonedaService {
	
	public List<TipoMoneda> findAll();
	
	public Optional<TipoMoneda> findById(Long id);
	
	public TipoMoneda save(TipoMoneda tipoMoneda);

	public void deleteById(Long id);

	boolean existsByNombre(Integer nombre);
	
	Optional<TipoMoneda> findByNombre(Integer nombre);
	
	Iterable<TipoMoneda> findAllByOrderByNombreAsc();

}
