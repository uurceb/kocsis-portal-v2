import React, { Component } from 'react';

const ProjectInfoView=(props)=> 
            <div>
                <div className="col-lg-5">
                    <dl className="dl-horizontal">
                        <dt>Created by:</dt> <dd>Uğur Cebeci</dd>
                        <dt>Description:</dt> <dd> {projectData && projectData.description}</dd>
                        <dt>Client:</dt> <dd><a href="#" className="text-navy"> {projectData && projectData.customer}</a> </dd>
                        <dt>Category:</dt> <dd> {projectData && projectData._category ? projectData._category.categoryName : 'No category'} </dd>
                    </dl>
                </div>
                <div className="col-lg-7" id="cluster_info">
                    <dl className="dl-horizontal" >
                        <dt>Last Updated:</dt> <dd>16.08.2014 12:15:57</dd>
                        <dt>Created:</dt> <dd> 	10.07.2014 23:36:57 </dd>
                        <dt>Participants:</dt>
                        <dd className="project-people">
                            <a href=""><img alt="image" className="img-circle" src="img/a3.jpg" /></a>
                            <a href=""><img alt="image" className="img-circle" src="img/a1.jpg" /></a>
                            <a href=""><img alt="image" className="img-circle" src="img/a2.jpg" /></a>
                            <a href=""><img alt="image" className="img-circle" src="img/a4.jpg" /></a>
                            <a href=""><img alt="image" className="img-circle" src="img/a5.jpg" /></a>
                        </dd>
                    </dl>
                </div>
            </div>;
        

export default ProjectInfoView;