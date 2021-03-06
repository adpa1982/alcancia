package com.alcancia.dto;

import java.util.Date;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

public class TipoMonedaDto {

    private Long id;

    @NotNull
    @Min(50)
    @Max(1000)
    private Integer nombre;

    private Date createdAt;

    private Date updatedAt;

    private Date deletedAt;


    public TipoMonedaDto() {
        super();
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
    public void setNombre(Integer nombre){
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

}
