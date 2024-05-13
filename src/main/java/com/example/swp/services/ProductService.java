package com.example.swp.services;

import com.example.swp.dtos.ProductDTO;
import com.example.swp.entities.Counters;
import com.example.swp.entities.Products;
import com.example.swp.exceptions.DataNotFoundException;
import com.example.swp.repositories.CounterRepository;
import com.example.swp.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ProductService implements IProductService{
    private final CounterRepository counterRepository;
    private final ProductRepository productRepository;
    public Products createProduct(ProductDTO productDTO) throws DataNotFoundException {
        Counters existingCounter = counterRepository.findById(productDTO.getCounterId())
                .orElseThrow(()-> new DataNotFoundException("Cannot find counter id"+ productDTO.getCounterId()));
        Products newProduct = Products
                .builder()
                .productName(productDTO.getProductName())
                .barcode(productDTO.getBarcode())
                .cost(productDTO.getCost())
                .type(productDTO.getType())
                .weight(productDTO.getWeight())
                .quantity(productDTO.getQuantity())
                .description(productDTO.getDescription())
                .counter(existingCounter)
                .build();
        return productRepository.save(newProduct);
    }
}
