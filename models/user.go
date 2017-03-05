package models

import (
	"time"

	"gopkg.in/mgo.v2/bson"
)

// User represents any user of the site
type User struct {
	ID        bson.ObjectId `json:"id,omitempty" bson:"_id,omitempty"`
	Name      string        `json:"name,omitempty" bson:"name,omitempty"`
	Email     string        `json:"email,omitempty" bson:"email,omitempty"`
	CreatedAt time.Time     `json:"created_at" bson:"created_at"`
}
