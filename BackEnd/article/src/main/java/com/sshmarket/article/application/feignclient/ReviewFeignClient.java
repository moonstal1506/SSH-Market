package com.sshmarket.article.application.feignclient;

import com.sshmarket.article.dto.ReviewResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = "review", url = "${review.url}")
public interface ReviewFeignClient {

    @GetMapping(path = "/reviews/list", produces = "application/json")
    List<ReviewResponseDto> getReviewList(@RequestParam List<Long> articleIds);



}