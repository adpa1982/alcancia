package com.alcancia.controller;

import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alcancia.dto.AlcanciaDto;
import com.alcancia.entity.Alcancia;
import com.alcancia.service.AlcanciaService;
import com.alcancia.utils.ErrorsFuntions;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/bank")
public class AlcanciaController {
	
	@Autowired
	private AlcanciaService service;
	
	public static final String FAILED = "Failed to search client from database!";
	public static final String NOT_FOUND = "No se encontro registro de la información de la alcancia en el sistema.";

	@GetMapping("/")
	public ResponseEntity<?> list() {
		try {
			Iterable<Alcancia> list = service.findAll();
			return ResponseEntity.status(HttpStatus.OK).body(list);
		} catch (DataAccessException e) {
			return ErrorsFuntions.errorMessage(e, FAILED);
		}
	}
	
	@PostMapping("/")
    public ResponseEntity<?> save(@Valid @RequestBody AlcanciaDto alcanciaDto, BindingResult result) {

        if (result.hasErrors()) {
            return this.validates(result);
        }

        Alcancia alcancia = new Alcancia();
        alcancia.setTipoMoneda(alcanciaDto.getTipoMoneda());
        
        try {
        	Alcancia entityDb = service.save(alcancia);
			return ResponseEntity.status(HttpStatus.CREATED).body(entityDb);
		} catch (DataAccessException e) {
			return ErrorsFuntions.errorMessageSave(e.getMostSpecificCause().getMessage());
		}
    }
    
    @GetMapping("/cantidad/{id}")
	public ResponseEntity<?> listCantidad(@PathVariable Long id) {
		try {
			Iterable<Alcancia> list = service.findAlcanciaByTipoMonedaByIdByGroupByNombre(id);
			return ResponseEntity.status(HttpStatus.OK).body(list);
		} catch (DataAccessException e) {
			return ErrorsFuntions.errorMessage(e, FAILED);
		}
	}
    
    @GetMapping("/valor/{id}")
	public ResponseEntity<?> listValor(@PathVariable Long id) {
		try {
			Iterable<Alcancia> list = service.findAlcanciaByTipoMonedaValorByIdByGroupByNombre(id);
			return ResponseEntity.status(HttpStatus.OK).body(list);
		} catch (DataAccessException e) {
			return ErrorsFuntions.errorMessage(e, FAILED);
		}
	}
    
    @GetMapping("/totalcantidad")
	public ResponseEntity<?> listCantidadTotal() {
		try {
			Long cantidad = service.findAlcanciaByMonedas();
			return ResponseEntity.status(HttpStatus.OK).body(cantidad);
		} catch (DataAccessException e) {
			return ErrorsFuntions.errorMessage(e, FAILED);
		}
	}
    
    @GetMapping("/totalvalor")
	public ResponseEntity<?> listValorTotal() {
		try {
			Long total = service.findAlcanciaByValor();
			return ResponseEntity.status(HttpStatus.OK).body(total);
		} catch (DataAccessException e) {
			return ErrorsFuntions.errorMessage(e, FAILED);
		}
	}

    protected ResponseEntity<?> validates(BindingResult result) {
		Map<String, Object> errores = new HashMap<>();
			result.getFieldErrors().forEach(err -> errores.put(err.getField(), "El campo " + err.getField() + " " + err.getDefaultMessage() )
		);
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errores);
	}

}
