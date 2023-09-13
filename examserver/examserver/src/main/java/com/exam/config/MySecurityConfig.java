package com.exam.config;

import com.exam.service.impl.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.authentication.configuration.EnableGlobalAuthentication;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@Configuration
@EnableWebSecurity
@EnableWebMvc
@EnableGlobalAuthentication
public class MySecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Autowired
    private JwtAuthenticationEntryPoint unauthorizedHandler;

    @Autowired
    private UserDetailsServiceImpl userDetailsServiceImpl;

//    public static final String[] PUBLIC_URL = {
//
//            "/generate-token",
//            "/user/",
//            "/v3/api-docs",
//            "/v2/api-docs",
//            "/swagger-resources/**",
//            "/swagger-ui/**",
//            "/webjars/**"
//    };



    //    @Bean
//    protected AuthenticationManager authenticationManagerBean() throws Exception
//    {
//        return this.authenticationManagerBean();
//    }
    @Bean
    public AuthenticationManager authenticationManagerBean(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() throws Exception {
        return new BCryptPasswordEncoder();
        //return NoOpPasswordEncoder.getInstance(); this is used for getting plain text password
    }

//    @Bean
//    protected void configure(AuthenticationManagerBuilder auth) throws Exception{
//        auth.userDetailsService(this.userDetailsServiceImpl).passwordEncoder(passwordEncoder());
//    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception
    {
        http
                .csrf()
                .disable()
                .cors()
                .disable()
                .authorizeHttpRequests()
//                .requestMatchers(PUBLIC_URL).permitAll()
                .requestMatchers("/generate-token", "/user/").permitAll()
//                .requestMatchers("/v3/api-docs").permitAll()
                .requestMatchers(HttpMethod.GET).permitAll()
                .anyRequest().authenticated()
                .and()
                .exceptionHandling().authenticationEntryPoint(unauthorizedHandler)
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

            http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

            http.authenticationProvider(daoAuthenticationProvider());
            DefaultSecurityFilterChain defaultSecurityFilterChain = http.build();

            return defaultSecurityFilterChain;
    }

    public DaoAuthenticationProvider daoAuthenticationProvider() throws Exception {

        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(this.userDetailsServiceImpl);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

}
