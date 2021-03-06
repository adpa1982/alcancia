package com.alcancia.entity;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.*;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import com.alcancia.utils.Time;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "alcancias")
@SQLDelete(sql = "UPDATE alcancias SET deleted_at = now() WHERE id = ?")
@Where(clause = "deleted_at is null")
public class Alcancia implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	// Relacion con TipoMoneda
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "id_tipomoneda", nullable = false)
	@JsonIgnoreProperties(value = { "tipoMonedas", "handler" }, allowSetters = true)
	private TipoMoneda tipoMoneda;

	@Column(name = "created_at", updatable = false, nullable = false)
	@Temporal(TemporalType.TIMESTAMP)
	private Date createdAt;

	@Column(name = "updated_at", nullable = false)
	@Temporal(TemporalType.TIMESTAMP)
	private Date updatedAt;

	@Column(name = "deleted_at")
	private Date deletedAt;

	public Alcancia() {
		super();
	}

	/**
	 * @Description: Metodo que asigna la fecha justo antes de persistir los datos
	 */
	@PrePersist
	public void prePersist() {
		Time timeDate = new Time();
		this.createdAt = timeDate.getPsTime();
		this.updatedAt = timeDate.getPsTime();
	}

	@PreUpdate
	public void preUpdate() {
		Time timeDate = new Time();
		this.updatedAt = timeDate.getPsTime();
	}

	@PreRemove
	public void preRemove() {
		Time timeDate = new Time();
		this.deletedAt = timeDate.getPsTime();
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
