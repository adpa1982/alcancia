package com.alcancia.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.alcancia.entity.TipoMoneda;

@Repository
public interface ITipoMonedaRepository extends JpaRepository<TipoMoneda, Long> {

	boolean existsByNombre(Integer nombre);
	
	Optional<TipoMoneda> findByNombre(Integer nombre);
	
	Iterable<TipoMoneda> findAllByOrderByNombreAsc();

}
