package com.alcancia.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alcancia.entity.TipoMoneda;
import com.alcancia.repository.ITipoMonedaRepository;

@Service
@Transactional
public class TipoMonedaService implements ITipoMonedaService {
	
	@Autowired
	private ITipoMonedaRepository repository;

	@Override
	public List<TipoMoneda> findAll() {
		return repository.findAll();
	}

	@Override
	public Optional<TipoMoneda> findById(Long id) {
		return repository.findById(id);
	}

	@Override
	public boolean existsByNombre(Integer nombre) {
		return repository.existsByNombre(nombre);
	}

	@Override
	public Optional<TipoMoneda> findByNombre(Integer nombre) {
		return repository.findByNombre(nombre);
	}

	@Override
	public TipoMoneda save(TipoMoneda tipoMoneda) {
		return repository.save(tipoMoneda);
	}

	@Override
	public void deleteById(Long id) {
		repository.deleteById(id);
	}
	
	@Override
	public Iterable<TipoMoneda> findAllByOrderByNombreAsc() {
		return repository.findAllByOrderByNombreAsc();
	}

}
