package com.example.phishingdetector.service;

import com.example.phishingdetector.model.AnalysisResult;
import org.springframework.stereotype.Service;

import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.*;

@Service
public class UrlAnalysisService {

    static String[] KEYWORDS = {
            "login", "verify", "update", "secure",
            "account", "bank", "payment", "confirm", "password"
    };

    public AnalysisResult analyze(String url) {

        int score = 0;
        List<String> reasons = new ArrayList<>();

        try {
            URL parsedUrl = new URL(url);
            String domain = parsedUrl.getHost();

            // ---------- RULES ----------

            // long URL
            if (url.length() > 75) {
                score += 1;
                reasons.add("Unusually long URL");
            }

            // http (not secure)
            if (url.startsWith("http://")) {
                score += 2;   // ⚡ more weight
                reasons.add("Uses HTTP instead of HTTPS");
            }

            // IP address check
            Pattern ipPattern = Pattern.compile("\\d+\\.\\d+\\.\\d+\\.\\d+");
            Matcher ipMatcher = ipPattern.matcher(domain);
            if (ipMatcher.find()) {
                score += 3;   // ⚡ high risk
                reasons.add("Uses IP address instead of domain name");
            }

            // too many subdomains
            if (domain.split("\\.").length > 4) {
                score += 1;
                reasons.add("Too many subdomains");
            }

            // @ symbol
            if (url.contains("@")) {
                score += 3;
                reasons.add("Contains '@' symbol (possible redirect)");
            }

            // hyphen in domain
            if (domain.contains("-")) {
                score += 2;
                reasons.add("Hyphenated domain (possible spoofing)");
            }

            // suspicious keywords
            for (String word : KEYWORDS) {
                if (url.toLowerCase().contains(word)) {
                    score += 1;
                    reasons.add("Contains sensitive keyword: " + word);
                }
            }

        } catch (Exception e) {
            score += 5;   // invalid URL = high risk
            reasons.add("Invalid URL format");
        }

        // ---------- CONVERT TO PERCENTAGE ----------

        int maxScore = 15;   // updated max score
        int percentage = (score * 100) / maxScore;

        if (percentage > 100) percentage = 100;

        // ---------- CLASSIFY ----------
        String verdict = classify(percentage);

        return new AnalysisResult(percentage, verdict, reasons);
    }

    // ---------- CLASSIFICATION ----------
    private String classify(int percentage) {

        if (percentage >= 70)
            return "HIGH RISK – Likely Phishing";
        else if (percentage >= 40)
            return "MEDIUM RISK – Suspicious";
        else
            return "LOW RISK – Probably Safe";
    }
}
