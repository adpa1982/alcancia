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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alcancia.dto.TipoMonedaDto;
import com.alcancia.entity.TipoMoneda;
import com.alcancia.service.TipoMonedaService;
import com.alcancia.utils.ErrorsFuntions;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/tipomoneda")
public class TipoMonedaController {
	
	@Autowired
	private TipoMonedaService service;
	
	public static final String FAILED = "Failed to search client from database!";
	public static final String NOT_FOUND = "No se encontro registro de la información del tipo de moneda en el sistema.";
	public static final String IM_USED_NOM = "Ya existe un nombre del tipo de moneda registrado anteriormente.";

	@GetMapping("/")
	public ResponseEntity<?> list() {
		try {
			Iterable<TipoMoneda> list = service.findAll();
			return ResponseEntity.status(HttpStatus.OK).body(list);
		} catch (DataAccessException e) {
			return ErrorsFuntions.errorMessage(e, FAILED);
		}
	}
	
	@PostMapping("/")
    public ResponseEntity<?> save(@Valid @RequestBody TipoMonedaDto tipomonedaDto, BindingResult result) {

        if (result.hasErrors()) {
            return this.validates(result);
        }
        
        if (service.existsByNombre(tipomonedaDto.getNombre())) {
			return ResponseEntity.status(HttpStatus.IM_USED).body(IM_USED_NOM);
		}

        TipoMoneda tipomoneda = new TipoMoneda();
        tipomoneda.setNombre(tipomonedaDto.getNombre());

        try {
        	TipoMoneda entityDb = service.save(tipomoneda);
			return ResponseEntity.status(HttpStatus.CREATED).body(entityDb);
		} catch (DataAccessException e) {
			return ErrorsFuntions.errorMessageSave(e.getMostSpecificCause().getMessage());
		}
    }
    
    @GetMapping("/all")
	public ResponseEntity<?> listOrder() {
		try {
			Iterable<TipoMoneda> list = service.findAllByOrderByNombreAsc();
			return ResponseEntity.status(HttpStatus.OK).body(list);
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
