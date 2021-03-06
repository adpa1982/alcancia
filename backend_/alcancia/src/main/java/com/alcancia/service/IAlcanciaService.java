package com.alcancia.service;

import java.util.List;

import org.springframework.data.repository.query.Param;

import com.alcancia.entity.Alcancia;

public interface IAlcanciaService {
	
	public List<Alcancia> findAll();
	
	public Alcancia save(Alcancia alcancia);
	
	public Iterable<Alcancia> findAlcanciaByTipoMonedaByIdByGroupByNombre(@Param("id") Long id);
	
	public Iterable<Alcancia> findAlcanciaByTipoMonedaValorByIdByGroupByNombre(@Param("id") Long id);
	
	public Long findAlcanciaByMonedas();
	
	public Long findAlcanciaByValor();

}
