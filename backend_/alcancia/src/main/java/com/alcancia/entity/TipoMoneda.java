package com.alcancia.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import com.alcancia.utils.Time;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "tipomonedas")
@SQLDelete(sql = "UPDATE tipomonedas SET deleted_at = now() WHERE id = ?")
@Where(clause = "deleted_at is null")
public class TipoMoneda implements Serializable  {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Min(50)
    @Max(1000)
    @Column(name = "nombre")
    private Integer nombre;

    @Column(name = "created_at", updatable = false, nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @Column(name = "updated_at", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;

    @Column(name = "deleted_at")
    private Date deletedAt;
    
    // Relacion con Alcancia
 	@OneToMany(mappedBy = "tipoMoneda", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
 	@JsonIgnoreProperties(value = { "tipoMoneda" }, allowSetters = true)
 	private List<Alcancia> alcancias;



    public TipoMoneda() {
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
    public Long getId(){
        return id;
    }
    /**
     * Metodo encargado de modificar el valor del atributo id
     *
     * @param id el nuevo id a modificar
     */
    public void setId(Long id){
        this.id = id;
    }

    /**
     * Metodo encargado de retornar el nombre
     *
     * @return El nombre asociado a la clase
     */
    public Integer getNombre(){
        return nombre;
    }
    /**
     * Metodo encargado de modificar el valor del atributo nombre
     *
     * @param nombre el nuevo nombre a modificar
     */
    public void setNombre(Integer nombre) {
		this.nombre = nombre;
	}

	/**
     * Metodo encargado de retornar el createdAt
     *
     * @return El createdAt asociado a la clase
     */
    public Date getCreatedAt(){
        return createdAt;
    }
    /**
     * Metodo encargado de modificar el valor del atributo createdAt
     *
     * @param createdAt el nuevo createdAt a modificar
     */
    public void setCreatedAt(Date createdAt){
        this.createdAt = createdAt;
    }

    /**
     * Metodo encargado de retornar el updatedAt
     *
     * @return El updatedAt asociado a la clase
     */
    public Date getUpdatedAt(){
        return updatedAt;
    }
    /**
     * Metodo encargado de modificar el valor del atributo updatedAt
     *
     * @param updatedAt el nuevo updatedAt a modificar
     */
    public void setUpdatedAt(Date updatedAt){
        this.updatedAt = updatedAt;
    }

    /**
     * Metodo encargado de retornar el deletedAt
     *
     * @return El deletedAt asociado a la clase
     */
    public Date getDeletedAt(){
        return deletedAt;
    }
    /**
     * Metodo encargado de modificar el valor del atributo deletedAt
     *
     * @param deletedAt el nuevo deletedAt a modificar
     */
    public void setDeletedAt(Date deletedAt){
        this.deletedAt = deletedAt;
    }

	public List<Alcancia> getTipoMonedas() {
		return alcancias;
	}

	public void setTipoMonedas(List<Alcancia> alcancias) {
		this.alcancias = alcancias;
	}

}
