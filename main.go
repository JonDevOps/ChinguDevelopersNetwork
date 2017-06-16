package main

import (
	"log"
	"net/http"
	"time"

	"github.com/Chingu-cohorts/ChinguCentral/controllers"
	"github.com/Chingu-cohorts/ChinguCentral/models"
	"github.com/Chingu-cohorts/ChinguCentral/utils"
	"github.com/julienschmidt/httprouter"
	"github.com/rs/cors"
	"github.com/urfave/negroni"
)

func init() {
	db := utils.InitDB()
	defer db.Close()

	db.AutoMigrate(&models.Cohort{}, &models.User{})
}

func main() {
	config, err := utils.LoadSettings("config.json")
	if err != nil {
		log.Fatalf("Something went wrong reading the config file: %v", err)
	}

	c := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:8080"},
	})

	r := httprouter.New()

	r.GET("/api/cohorts", controllers.ListCohorts)
	r.GET("/api/cohorts/:id", controllers.ShowCohort)
	r.POST("/api/cohorts", controllers.CreateCohort)

	n := negroni.Classic()
	n.Use(c)
	n.UseHandler(r)

	s := &http.Server{
		Addr:           config.Port,
		Handler:        n,
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}

	log.Fatal(s.ListenAndServe())
}
