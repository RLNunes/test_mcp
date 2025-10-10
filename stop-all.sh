#!/bin/bash

# Luxury Brands Application Stop Script
# This script stops both the backend and frontend servers

echo "======================================"
echo "Stopping Luxury Brands Application"
echo "======================================"
echo ""

# Stop backend if PID file exists
if [ -f ".backend.pid" ]; then
    BACKEND_PID=$(cat .backend.pid)
    if ps -p $BACKEND_PID > /dev/null 2>&1; then
        echo "Stopping backend (PID: $BACKEND_PID)..."
        kill $BACKEND_PID
        echo "✓ Backend stopped"
    else
        echo "Backend process not running"
    fi
    rm .backend.pid
else
    echo "No backend PID file found"
fi

# Stop frontend if PID file exists
if [ -f ".frontend.pid" ]; then
    FRONTEND_PID=$(cat .frontend.pid)
    if ps -p $FRONTEND_PID > /dev/null 2>&1; then
        echo "Stopping frontend (PID: $FRONTEND_PID)..."
        kill $FRONTEND_PID
        echo "✓ Frontend stopped"
    else
        echo "Frontend process not running"
    fi
    rm .frontend.pid
else
    echo "No frontend PID file found"
fi

# Clean up log files
if [ -f "backend.log" ]; then
    rm backend.log
fi

if [ -f "frontend.log" ]; then
    rm frontend.log
fi

echo ""
echo "All services stopped"
echo "======================================"
