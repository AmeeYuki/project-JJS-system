package com.example.swp.dtos;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {
    @JsonProperty(value = "product_name")
    private String productName;
    @JsonProperty(value = "barcode")
    private String barcode;
    @JsonProperty(value = "quantity")
    private Long quantity;
    @JsonProperty(value = "cost")
    private double cost;
    @JsonProperty(value = "weight")
    private double weight;
    @JsonProperty(value = "description")
    private String description;
    @JsonProperty(value = "type")
    private String type;
    @JsonProperty(value = "counter_id")
    private Long counterId;
}
