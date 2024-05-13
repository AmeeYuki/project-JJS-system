package com.example.swp.services;

import com.example.swp.dtos.ProductDTO;
import com.example.swp.entities.Products;
import com.example.swp.exceptions.DataNotFoundException;

public interface IProductService {
    Products createProduct(ProductDTO productDTO) throws DataNotFoundException;
}
