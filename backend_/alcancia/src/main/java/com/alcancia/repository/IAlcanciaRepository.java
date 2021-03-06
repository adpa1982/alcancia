package com.alcancia.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.alcancia.entity.Alcancia;

public interface IAlcanciaRepository extends JpaRepository<Alcancia, Long> {
	
	@Query("SELECT t.nombre, count(t.nombre) FROM Alcancia a, TipoMoneda t WHERE a.tipoMoneda.id = t.id and t.id = :id group by t.nombre")
	public Iterable<Alcancia> findAlcanciaByTipoMonedaByIdByGroupByNombre(@Param("id") Long id);
	
	@Query("SELECT t.nombre, sum(t.nombre) FROM Alcancia a, TipoMoneda t WHERE a.tipoMoneda.id = t.id and t.id = :id group by t.nombre")
	public Iterable<Alcancia> findAlcanciaByTipoMonedaValorByIdByGroupByNombre(@Param("id") Long id);

	@Query("SELECT count(t.nombre) FROM Alcancia a, TipoMoneda t WHERE a.tipoMoneda.id = t.id")
	public Long findAlcanciaByMonedas();
	
	@Query("SELECT sum(t.nombre) FROM Alcancia a, TipoMoneda t WHERE a.tipoMoneda.id = t.id")
	public Long findAlcanciaByValor();

}
