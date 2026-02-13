package com.example.phishingdetector.model;

import java.util.List;

public class AnalysisResult {

    public int score;
    public String verdict;
    public List<String> reasons;

    public AnalysisResult(int score, String verdict, List<String> reasons) {
        this.score = score;
        this.verdict = verdict;
        this.reasons = reasons;
    }
}
