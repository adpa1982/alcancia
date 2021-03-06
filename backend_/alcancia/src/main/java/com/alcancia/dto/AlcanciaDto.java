package com.alcancia.dto;

import java.util.Date;

import com.alcancia.entity.TipoMoneda;

public class AlcanciaDto {

	private Long id;

	private TipoMoneda tipoMoneda;

	private Date createdAt;

	private Date updatedAt;

	private Date deletedAt;

	public AlcanciaDto() {
		super();
	}

	/**
	 * Metodo encargado de retornar el id
	 *
	 * @return El id asociado a la clase
	 */
	public Long getId() {
		return id;
	}

	/**
	 * Metodo encargado de modificar el valor del atributo id
	 *
	 * @param id el nuevo id a modificar
	 */
	public void setId(Long id) {
		this.id = id;
	}

	/**
	 * Metodo encargado de retornar el idTipomoneda
	 *
	 * @return El idTipomoneda asociado a la clase
	 */
	public TipoMoneda getTipoMoneda() {
		return tipoMoneda;
	}

	/**
	 * Metodo encargado de modificar el valor del atributo idTipomoneda
	 *
	 * @param idTipomoneda el nuevo idTipomoneda a modificar
	 */
	public void setTipoMoneda(TipoMoneda tipoMoneda) {
		this.tipoMoneda = tipoMoneda;
	}

	/**
	 * Metodo encargado de retornar el createdAt
	 *
	 * @return El createdAt asociado a la clase
	 */
	public Date getCreatedAt() {
		return createdAt;
	}

	/**
	 * Metodo encargado de modificar el valor del atributo createdAt
	 *
	 * @param createdAt el nuevo createdAt a modificar
	 */
	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	/**
	 * Metodo encargado de retornar el updatedAt
	 *
	 * @return El updatedAt asociado a la clase
	 */
	public Date getUpdatedAt() {
		return updatedAt;
	}

	/**
	 * Metodo encargado de modificar el valor del atributo updatedAt
	 *
	 * @param updatedAt el nuevo updatedAt a modificar
	 */
	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	/**
	 * Metodo encargado de retornar el deletedAt
	 *
	 * @return El deletedAt asociado a la clase
	 */
	public Date getDeletedAt() {
		return deletedAt;
	}

	/**
	 * Metodo encargado de modificar el valor del atributo deletedAt
	 *
	 * @param deletedAt el nuevo deletedAt a modificar
	 */
	public void setDeletedAt(Date deletedAt) {
		this.deletedAt = deletedAt;
	}

}
