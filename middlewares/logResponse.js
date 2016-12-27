var config = require('../lib/config');
var error = require('../lib/error');
var logger = require('../lib/logger');

module.exports = function(req, res, next) {
    if (req.method !== 'OPTIONS') {
        res.on('finish', function() {
            var access = {
                timestamp: (new Date()).toISOString(),
                ip: req.ip,
                forwardedIP: req.headers['x-forwarded-for'],
                method: req.method,
                path: req.path,
                params: req.params,
                body: req.body,
                authn_user_id: (res.locals && res.locals.authn_user) ? res.locals.authn_user.id : null,
                authn_user_uid: (res.locals && res.locals.authn_user) ? res.locals.authn_user.uid : null,
                user_id: (res.locals && res.locals.user) ? res.locals.user.id : null,
                user_uid: (res.locals && res.locals.user) ? res.locals.user.uid : null,
                course_id: (res.locals && res.locals.course) ? res.locals.course.id : null,
                course_short_name: (res.locals && res.locals.course) ? res.locals.course.short_name : null,
                course_instance_id: (res.locals && res.locals.course_instance) ? res.locals.course_instance.id : null,
                course_instance_short_name: (res.locals && res.locals.course_instance) ? res.locals.course_instance.short_name : null,
                assessment_id: (res.locals && res.locals.assessment) ? res.locals.assessment.id : null,
                assessment_directory: (res.locals && res.locals.assessment) ? res.locals.assessment.tid : null,
                assessment_instance_id: (res.locals && res.locals.assessment_instance) ? res.locals.assessment_instance.id : null,
                question_id: (res.locals && res.locals.question) ? res.locals.question.id : null,
                question_directory: (res.locals && res.locals.question) ? res.locals.question.directory : null,
                question_instance_id: (res.locals && res.locals.question_instance) ? res.locals.question_instance.id : null,
            };
            logger.verbose("response", access);
        });
    }
    next();
};
