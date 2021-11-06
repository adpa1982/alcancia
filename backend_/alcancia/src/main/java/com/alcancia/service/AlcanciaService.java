package com.alcancia.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.alcancia.entity.Alcancia;
import com.alcancia.repository.IAlcanciaRepository;

@Service
public class AlcanciaService implements IAlcanciaService {
	
	@Autowired
	private IAlcanciaRepository repository;
	
	@Override
	public List<Alcancia> findAll() {
		return repository.findAll();
	}

	@Override
	public Alcancia save(Alcancia alcancia) {
		return repository.save(alcancia);
	}
	
	@Override
	public Iterable<Alcancia> findAlcanciaByTipoMonedaByIdByGroupByNombre(Long id) {
		return repository.findAlcanciaByTipoMonedaByIdByGroupByNombre(id);
	}
	
	@Override
	public Iterable<Alcancia> findAlcanciaByTipoMonedaValorByIdByGroupByNombre(Long id) {
		return repository.findAlcanciaByTipoMonedaValorByIdByGroupByNombre(id);
	}
	
	@Override
	public Long findAlcanciaByMonedas() {
		return repository.findAlcanciaByMonedas();
	}
	
	@Override
	public Long findAlcanciaByValor() {
		return repository.findAlcanciaByValor();
	}

}
