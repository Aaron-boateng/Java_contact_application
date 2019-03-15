package com.restApiSQL;

import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;

public final class RequestFilter implements Filter {
	HttpServletRequest req; 
	HttpServletRequest resp;
	
    public void init(FilterConfig filterConfig)
         throws ServletException {
    	
    }
    
    public void securityHandler() throws IOException {
    	
    	((HttpServletResponse) this.resp).sendRedirect(this.req.getContextPath() + "/login");
    	
    }
    
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		
		this.securityHandler();
		
	}


}
